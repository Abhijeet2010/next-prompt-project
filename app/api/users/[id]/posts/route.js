import Prompt from "@models/promptSchema";
import connectToDb from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectToDb();
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      { error: "Failed to Fetch Prompts" },
      { status: 500 }
    );
  }
}
