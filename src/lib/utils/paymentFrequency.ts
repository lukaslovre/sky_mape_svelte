import type { Property } from "../../types";

type PaymentFrequency = Property["paymentFrequency"];

export const parsePaymentFrequency = (
  value: PaymentFrequency
): { label: string; shortLabel: string } => {
  switch (value) {
    case "weekly":
      return { label: "Tjedno", shortLabel: "tj" };
    case "bi-weekly":
      return { label: "Dvotjedno", shortLabel: "2tj" };
    case "monthly":
      return { label: "Mjesečno", shortLabel: "mj" };
    case "quarterly":
      return { label: "Tromjesečno", shortLabel: "3mj" };
    case "semi-annually":
      return { label: "Polugodišnje", shortLabel: "6mj" };
    case "annually":
      return { label: "Godišnje", shortLabel: "god" };
    case null:
      return { label: "Nije postavljeno", shortLabel: "" };
    default:
      return { label: "Mjesečno (d)", shortLabel: "mj" };
  }
};

const paymentFrequencies: PaymentFrequency[] = [
  "weekly",
  "bi-weekly",
  "monthly",
  "quarterly",
  "semi-annually",
  "annually",
];

export const paymentFrequencyDropdownOptions: { value: string; label: string }[] =
  paymentFrequencies.map((frequencyValue) => {
    return {
      value: frequencyValue as string,
      label: `${parsePaymentFrequency(frequencyValue).label} (${
        parsePaymentFrequency(frequencyValue).shortLabel
      }.)`,
    };
  });
