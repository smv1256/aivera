import { NextResponse } from "next/server";  
import hashPassword from "../../../../backend/utils/passwords";
import validEmail from "../../../../backend/utils/email";
import { adminDB } from "../../../../backend/lib/firestoreAdmin";
  
export async function POST(req: Request) {
  console.log("API hit");

  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields required" }, { status: 400 });
    }

    const userRef = adminDB.collection("users").doc(email);
    const userSnap = await userRef.get();

    if (!validEmail(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (userSnap.exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);

    // Store user in Firestore
    await userRef.set({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // window.location.href = "/dashboard"; 
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
