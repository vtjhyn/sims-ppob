export default function formatCurrency(balance) {
  return balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
