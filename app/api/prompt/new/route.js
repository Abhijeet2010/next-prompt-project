import Prompt from "@models/promptSchema";
import connectToDb from "@utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt, tag, userId } = await request.json();
  try {
    await connectToDb();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    console.log(JSON.stringify(newPrompt));

    return new NextResponse(JSON.stringify(newPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      { error: "Failed to Create New Prompt" + error.message },
      { status: 500 }
    );
  }
}
