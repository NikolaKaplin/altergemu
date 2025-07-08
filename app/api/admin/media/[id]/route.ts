import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";
import { deleteFile } from "@/lib/s3";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get file info first
    const [mediaFile] = await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.id, Number.parseInt(params.id)));

    if (!mediaFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete from S3
    await deleteFile(mediaFile.filename);

    // Delete from database
    await db
      .delete(mediaFiles)
      .where(eq(mediaFiles.id, Number.parseInt(params.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
