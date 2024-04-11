export const formatCurrency = (amount: string) => {
  const number = parseInt(amount, 10);

  if (isNaN(number)) {
    return "Invalid input";
  }

  const formattedAmount = new Intl.NumberFormat("en-US").format(number);

  const formattedCurrency = formattedAmount + "₮";

  return formattedCurrency;
};
