import { CartItem, CheckoutFormState } from '../types';

export const CANE_WHATSAPP_NUMBER = '918086320007';
export const CANE_DISPLAY_PHONE = '08086320007';

export function generateWhatsAppMessage(
  cartItems: CartItem[],
  subtotal: number,
  deliveryCharge: number,
  total: number,
  form: CheckoutFormState
): string {
  const itemsText = cartItems
    .map((item) => {
      const addOnsPart = item.addOns.length > 0 ? ` (+ ${item.addOns.join(', ')})` : '';
      const linePrice = item.unitPrice * item.quantity;
      return `• ${item.name}${addOnsPart} — ${item.size.name} × ${item.quantity} — ₹${linePrice}`;
    })
    .join('\n');

  let orderTypeSection = '';

  if (form.orderType === 'takeaway') {
    orderTypeSection = `*ORDER TYPE:* Takeaway\n\n*PREFERRED PICKUP TIME:* ${form.preferredPickupTime || 'As soon as possible'}`;
  } else if (form.orderType === 'dine-in') {
    orderTypeSection = `*ORDER TYPE:* Dine-in\n\n*TABLE / SEATING DETAILS:* ${form.tableDetails || 'Walk-in seating'}\n*PREFERRED TIME:* ${form.preferredDineInTime || 'Now'}`;
  } else {
    // Delivery
    orderTypeSection = `*ORDER TYPE:* Delivery\n\n*DELIVERY ADDRESS*\n\nHouse/Flat No.: ${form.houseFlat}\nStreet/Area: ${form.streetArea}${form.landmark ? `\nLandmark: ${form.landmark}` : ''}\nCity: ${form.city}\nPIN Code: ${form.pinCode}\n\n*PREFERRED DELIVERY TIME:* ${form.preferredDeliveryTime || 'Standard Delivery'}`;
  }

  const specialInstructionsPart = form.specialInstructions.trim()
    ? `\n\n*SPECIAL INSTRUCTIONS:* ${form.specialInstructions.trim()}`
    : '';

  const totalsText =
    form.orderType === 'delivery'
      ? `*SUBTOTAL:* ₹${subtotal}\n*DELIVERY CHARGE:* ₹${deliveryCharge}\n*TOTAL:* ₹${total}`
      : `*SUBTOTAL:* ₹${subtotal}\n*TOTAL:* ₹${total}`;

  const message = `Hi CANE! 👋

I'd like to place an order.

*ORDER DETAILS*

${itemsText}

${totalsText}

*CUSTOMER DETAILS*

Name: ${form.fullName}
Mobile: ${form.mobile}

${orderTypeSection}${specialInstructionsPart}

Please confirm my order. Thank you! 🌸`;

  return message;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${CANE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
