import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [item] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, Number.parseInt(params.id)));
    if (!item) {
      return NextResponse.json(
        { error: "Portfolio item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const [item] = await db
      .update(portfolioItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioItems.id, Number.parseInt(params.id)));

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, Number.parseInt(params.id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
