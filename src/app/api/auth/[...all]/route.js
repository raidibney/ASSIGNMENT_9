import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

// This forces Next.js to treat the route as completely dynamic, 
// stopping the build workers from trying to statically pre-render it.
export const dynamic = "force-dynamic"; 

export const { POST, GET } = toNextJsHandler(auth);