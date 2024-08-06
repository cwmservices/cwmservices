import { NextResponse } from "next/server";
import {data} from "../../data";

export const GET = (req:Request,res:Response)=>{
    return NextResponse.json(data);
}