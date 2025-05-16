import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, models, model } from "mongoose";

const uri =
  "mongodb+srv://companionai63:QE6PvLglfoN4C0gv@cluster0.p4ouej5.mongodb.net/workshop";

// Prevent re-declaration in dev
const registrationSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  hasPaid: Boolean,
  createdAt: { type: Date, default: Date.now },
});
const Registration =
  models.Registration || model("Registration", registrationSchema);

async function dbConnect() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, hasPaid } = await req.json();
    if (!name || !email || !phone || !hasPaid) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    await dbConnect();
    await Registration.create({ name, email, phone, hasPaid });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
