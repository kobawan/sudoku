import { MenuContentSectionProps } from "./MenuContentSection";

export enum MenuSection {
  Stats = "Stats",
  Settings = "Settings",
  Rules = "Rules",
  About = "About",
  Contacts = "Contacts",
}

export type SharedSectionProps = Pick<
  MenuContentSectionProps,
  "crossOnClick" | "arrowOnClick"
>;
