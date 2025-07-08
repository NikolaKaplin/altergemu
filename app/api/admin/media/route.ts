import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";
import { uploadFile } from "@/lib/s3";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const mediaList = await db
      .select()
      .from(mediaFiles)
      .orderBy(desc(mediaFiles.createdAt));
    return NextResponse.json(mediaList);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to S3
    const uploadResult = await uploadFile(file, folder);

    // Save to database
    const [mediaFile] = await db
      .insert(mediaFiles)
      .values({
        filename: uploadResult.key,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: uploadResult.url,
        folder: folder,
        uploadedBy: user.id,
        createdAt: new Date(),
      })
      .$returningId();

    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
