export const generateInvoiceHtml = ({
  startDate,
  endDate,
  amount,
  imageUrl,
  aadharImageUrl,
  username,
  email,
  phone,
  cabin,
}: {
  startDate: string;
  endDate: string;
  amount: string;
  imageUrl: string;
  aadharImageUrl: string;
  username: string;
  email: string;
  phone: string;
  cabin: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Library Registration Invoice</title>
  <style>
    body {
      margin: 0;
      background: #f4f7fc;
      font-family: 'Helvetica Neue', sans-serif;
      color: #333;
      line-height: 1.4;
      padding: 20px;
      font-size: 13px;
    }

    .invoice-container {
      max-width: 720px;
      margin: auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      overflow: hidden;
      page-break-inside: avoid;
    }

    .header {
      background: linear-gradient(135deg, #4f46e5, #6366f1);
      color: white;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
    }

    .invoice-details {
      padding: 20px;
    }

    .details-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      border-bottom: 1px solid #eee;
      padding-bottom: 8px;
    }

    .details-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #555;
    }

    .value {
      color: #111;
    }

    .images-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 0 20px 20px;
    }

    .image-box {
      flex: 1 1 48%;
    }

    .image-box h2 {
      font-size: 16px;
      margin-bottom: 8px;
      color: #4f46e5;
    }

    .image-box img {
      width: 100%;
      max-height: 280px;
      object-fit: contain;
      border-radius: 6px;
      border: 1px solid #ddd;
    }

    .note {
      background: #f9fafb;
      padding: 12px 20px;
      border-top: 1px solid #eee;
      font-size: 12px;
      text-align: center;
      color: #666;
    }

    @media (max-width: 600px) {
      .details-row {
        flex-direction: column;
        gap: 4px;
      }

      .images-row {
        flex-direction: column;
      }

      .image-box {
        flex: 1 1 100%;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="header">
      <h1>Library Registration Invoice</h1>
    </div>

    <div class="invoice-details">
      <div class="details-row">
        <div class="label">Name:</div>
        <div class="value">${username}</div>
      </div>
      <div class="details-row">
        <div class="label">Phone Number:</div>
        <div class="value">${phone}</div>
      </div>
      <div class="details-row">
        <div class="label">Email Address:</div>
        <div class="value">${email}</div>
      </div>
      <div class="details-row">
        <div class="label">Cabin Allotted:</div>
        <div class="value">${cabin}</div>
      </div>
      <div class="details-row">
        <div class="label">Start Date:</div>
        <div class="value">${startDate}</div>
      </div>
      <div class="details-row">
        <div class="label">End Date:</div>
        <div class="value">${endDate}</div>
      </div>
      <div class="details-row">
        <div class="label">Amount Paid:</div>
        <div class="value">${amount}</div>
      </div>
    </div>

    <div class="images-row">
      <div class="image-box">
        <h2>Payment Proof</h2>
        <img src="${imageUrl}" alt="Payment Proof" />
      </div>
      <div class="image-box">
        <h2>Aadhar Card</h2>
        <img src="${aadharImageUrl}" alt="Aadhar Card" />
      </div>
    </div>

    <div class="note">
      This is a system-generated invoice and does not require a signature.
    </div>
  </div>
</body>
</html>
`;
