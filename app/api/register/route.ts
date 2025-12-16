import { sendInvoiceEmail } from "@/lib/emailService";
import { generateInvoiceHtml } from "@/lib/invocietemplate";
import { generateInvoicePdf } from "@/lib/pdfGenerator";
import { NextRequest, NextResponse } from "next/server";
import { format, addMonths } from "date-fns";
import { uploadPdfToS3 } from "@/lib/s3";

export const config = {
  runtime: "nodejs",
};
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const startDate = format(new Date(), "dd MMM yyyy");
      const endDate = format(addMonths(new Date(), 1), "dd MMM yyyy");
      const htmltemplate = generateInvoiceHtml({
        amount: "1000",
        endDate,
        imageUrl: body.paymentProof,
        startDate,
        email: body.email,
        phone: body.phone,
        username: body.name,
        cabin: body.cabin,
        aadharImageUrl: body.aadharCard,
      });

      const pdfBuffer = Buffer.from(await generateInvoicePdf(htmltemplate));
      const pdfUrl = await uploadPdfToS3(pdfBuffer, body.name);
      const mailOptions = {
        from: process.env.NEXT_EMAIL_ID,
        to: body.email,
        cc: process.env.NEXT_EMAIL_ID,
        subject: "Your Library Invoice",
        text: "Please find your library invoice attached.",
        attachments: [
          {
            filename: "invoice.pdf",
            path: pdfUrl,
            contentType: "application/pdf",
          },
        ],
      };

      await sendInvoiceEmail(mailOptions);
      return NextResponse.json(
        { message: "Mail Sent Successfully", status: 200 },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
