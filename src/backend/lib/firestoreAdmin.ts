import admin from "firebase-admin";
import { cert } from "firebase-admin/app";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
      }) 
 });
}

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();
