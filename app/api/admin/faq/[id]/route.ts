import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqItems } from "@/lib/db/schema";
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

    const [faqItem] = await db
      .select()
      .from(faqItems)
      .where(eq(faqItems.id, Number.parseInt(params.id)));

    if (!faqItem) {
      return NextResponse.json(
        { error: "FAQ item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(faqItem);
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
    console.log(data);
    const response = await db
      .update(faqItems)
      .set({
        answer: data.answer,
        question: data.question,
        category: data.category,
        order: data.order,
        isActive: data.isActive,
      })
      .where(eq(faqItems.id, Number(params.id)))
      .catch((err) => {
        console.log(err);
      });
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
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
      .delete(faqItems)
      .where(eq(faqItems.id, Number.parseInt(params.id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
