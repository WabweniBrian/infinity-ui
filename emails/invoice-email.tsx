import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { formatDate } from "@/lib/utils";
import type { PaymentStatus } from "@prisma/client";

interface InvoiceEmailProps {
  purchase: {
    id: string;
    isComponent: boolean;
    status: PaymentStatus;
    isBundle: boolean;
    isPack: boolean;
    amount: number;
    date: Date;
    address: string | null;
    phone: string | null;
    zipCode: string | null;
    orderNumber: string | null;
    component: {
      name: string;
    } | null;
  };
  user: {
    name: string | null;
    email: string | null;
  };
}

export const InvoiceEmail = ({ purchase, user }: InvoiceEmailProps) => {
  // Generate invoice item based on purchase type
  const getInvoiceItem = () => {
    let itemName = "Unknown Item";
    let itemType = "Item";

    if (purchase.isComponent && purchase.component) {
      itemName = purchase.component.name;
      itemType = "Component";
    } else if (purchase.isBundle) {
      itemName = "Bundle Package";
      itemType = "Bundle";
    } else if (purchase.isPack) {
      itemName = "Component Pack";
      itemType = "Pack";
    }

    return {
      name: itemName,
      type: itemType,
      price: purchase.amount,
    };
  };

  const invoiceItem = getInvoiceItem();

  // Calculate subtotal, tax, and total
  const subtotal = invoiceItem.price;
  const taxRate = 0.0;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "SUCCESS":
        return "#16a34a"; // green-600
      case "PENDING":
        return "#ca8a04"; // yellow-600
      default:
        return "#dc2626"; // red-600
    }
  };

  return (
    <Html>
      <Head />
      <Preview>
        Your Invoice from Infinity UI - #{purchase.orderNumber || "N/A"}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading as="h1" style={heading}>
              INVOICE
            </Heading>
            <Text style={subheading}>#{purchase.orderNumber || "N/A"}</Text>
          </Section>

          <Section style={companySection}>
            <Row>
              <Column>
                <Text style={companyName}>Infinity UI</Text>
                <Text style={companyDetail}>Kololo</Text>
                <Text style={companyDetail}>Kampala Uganda</Text>
                <Text style={companyDetail}>support@infinityui.dev</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Section style={infoSection}>
            <Row>
              <Column style={{ width: "50%" }}>
                <Text style={sectionTitle}>Bill To:</Text>
                <Text style={customerName}>{user?.name || "Customer"}</Text>
                <Text style={customerDetail}>
                  {user?.email || "No email provided"}
                </Text>
                {purchase?.address && (
                  <Text style={customerDetail}>
                    {purchase?.address}{" "}
                    {purchase.zipCode && <span>, {purchase.zipCode} </span>}
                  </Text>
                )}
                {purchase?.phone && (
                  <Text style={customerDetail}>{purchase?.phone}</Text>
                )}
              </Column>
              <Column style={{ width: "50%" }}>
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text style={sectionTitle}>Invoice Number:</Text>
                    <Text style={infoText}>
                      INV-{purchase.orderNumber || "N/A"}
                    </Text>
                  </Column>
                  <Column style={{ width: "50%" }}>
                    <Text style={sectionTitle}>Date:</Text>
                    <Text style={infoText}>{formatDate(purchase.date)}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text style={sectionTitle}>Payment Status:</Text>
                    <Text
                      style={{
                        ...infoText,
                        color: getStatusColor(purchase.status),
                      }}
                    >
                      {purchase.status}
                    </Text>
                  </Column>
                  <Column style={{ width: "50%" }}>
                    <Text style={sectionTitle}>Due Date:</Text>
                    <Text style={infoText}>{formatDate(purchase.date)}</Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>

          <Section style={tableSection}>
            <Row style={tableHeader}>
              <Column style={{ ...tableHeaderCell, width: "40%" }}>Item</Column>
              <Column style={{ ...tableHeaderCell, width: "20%" }}>Type</Column>
              <Column
                style={{ ...tableHeaderCell, width: "15%", textAlign: "right" }}
              >
                Price
              </Column>
              <Column
                style={{
                  ...tableHeaderCell,
                  width: "10%",
                  textAlign: "center",
                }}
              >
                Qty
              </Column>
              <Column
                style={{ ...tableHeaderCell, width: "15%", textAlign: "right" }}
              >
                Total
              </Column>
            </Row>
            <Row style={tableRow}>
              <Column style={{ ...tableCell, width: "40%" }}>
                {invoiceItem.name}
              </Column>
              <Column style={{ ...tableCell, width: "20%" }}>
                {invoiceItem.type}
              </Column>
              <Column
                style={{ ...tableCell, width: "15%", textAlign: "right" }}
              >
                ${invoiceItem.price.toFixed(2)}
              </Column>
              <Column
                style={{ ...tableCell, width: "10%", textAlign: "center" }}
              >
                1
              </Column>
              <Column
                style={{ ...tableCell, width: "15%", textAlign: "right" }}
              >
                ${invoiceItem.price.toFixed(2)}
              </Column>
            </Row>
          </Section>

          <Section style={{ marginTop: "24px" }}>
            <Row>
              <Column style={{ width: "65%" }}></Column>
              <Column style={{ width: "35%" }}>
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text style={summaryLabel}>Subtotal:</Text>
                  </Column>
                  <Column style={{ width: "50%", textAlign: "right" }}>
                    <Text style={summaryValue}>${subtotal.toFixed(2)}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text style={summaryLabel}>Tax (0.0%):</Text>
                  </Column>
                  <Column style={{ width: "50%", textAlign: "right" }}>
                    <Text style={summaryValue}>${tax.toFixed(2)}</Text>
                  </Column>
                </Row>
                <Hr style={totalDivider} />
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text style={totalLabel}>Total:</Text>
                  </Column>
                  <Column style={{ width: "50%", textAlign: "right" }}>
                    <Text style={totalValue}>${total.toFixed(2)}</Text>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          <Section>
            <Text style={sectionTitle}>Notes:</Text>
            <Text style={noteText}>
              Thank you for your purchase! If you have any questions about this
              invoice, please contact our support team at
              support@infinityui.dev.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This is a computer-generated document. No signature is required.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "700px",
};

const logoContainer = {
  marginBottom: "24px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  margin: "0",
  color: "#1f2937",
};

const subheading = {
  color: "#6b7280",
  fontSize: "16px",
  margin: "4px 0 0",
};

const companySection = {
  textAlign: "right" as const,
  marginBottom: "24px",
};

const companyName = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#11ACBB",
  margin: "0",
};

const companyDetail = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "4px 0 0",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const infoSection = {
  marginBottom: "24px",
};

const sectionTitle = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "8px",
};

const customerName = {
  fontSize: "16px",
  fontWeight: "500",
  margin: "0 0 4px",
};

const customerDetail = {
  color: "#6b7280",
  fontSize: "14px",
  margin: "4px 0",
};

const infoText = {
  fontSize: "14px",
  fontWeight: "500",
  margin: "0 0 12px",
};

const tableSection = {
  marginTop: "24px",
};

const tableHeader = {
  backgroundColor: "#f9fafb",
  borderBottom: "1px solid #e5e7eb",
};

const tableHeaderCell = {
  padding: "12px 16px",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
};

const tableRow = {
  borderBottom: "1px solid #e5e7eb",
};

const tableCell = {
  padding: "16px",
  fontSize: "14px",
  color: "#1f2937",
};

const summaryLabel = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "8px 0",
};

const summaryValue = {
  fontSize: "14px",
  fontWeight: "500",
  margin: "8px 0",
};

const totalDivider = {
  borderColor: "#e5e7eb",
  margin: "8px 0",
};

const totalLabel = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "8px 0",
};

const totalValue = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "8px 0",
};

const noteText = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "8px 0",
};

const footer = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#9ca3af",
};

export default InvoiceEmail;
