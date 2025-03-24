import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Checkout from "@/components/main/checkout/checkout";

export const metadata = {
  title: "Checkout",
};

type Component = {
  id: string;
  name: string;
  price: number | null;
  category: { name: string };
};

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const paymentFor = searchParams.paymentFor as string | undefined;
  const componentId = searchParams.componentId as string | undefined;

  if (!paymentFor || !["component", "bundle", "pack"].includes(paymentFor)) {
    redirect("/");
  }

  if (paymentFor === "component" && !componentId) {
    redirect("/");
  }

  const user = await getCurrentUser();

  let component: Component | null = null;

  if (componentId) {
    component = await prisma.component.findUnique({
      where: { id: componentId },
      select: {
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });

    if (!component) redirect("/");
  }

  return <Checkout user={user} component={component} paymentFor={paymentFor} />;
};

export default CheckoutPage;
