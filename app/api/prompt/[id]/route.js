import Prompt from "@models/promptSchema";
import connectToDb from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await connectToDb();
    const singlePrompt = await Prompt.findById(id);
    if (!singlePrompt) {
      return NextResponse.json("Prompt Not Found", { status: 404 });
    }
    return NextResponse.json(singlePrompt, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error to find Prompt=>>>", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const { prompt, tag } = await request.json();
  const { id } = params;
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(id);
    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt Not Found" }, { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return NextResponse.json(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
