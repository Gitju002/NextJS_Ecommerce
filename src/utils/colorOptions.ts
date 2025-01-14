import { StylesConfig } from "react-select";
import chroma from "chroma-js";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const multiSelectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderRadius: "8px",
    boxShadow: "none",
    padding: "2px",
    "&:hover": {
      borderColor: "gray",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma((data as ColourOption).color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ?(data as ColourOption).color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : (data as ColourOption).color,
      cursor: isDisabled ? "not-allowed" : "pointer",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? (data as ColourOption).color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: chroma((data as ColourOption).color).alpha(0.2).css(),
    borderRadius: "4px",
    padding: "2px",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: (data as ColourOption).color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: (data as ColourOption).color,
    cursor: "pointer",
    ":hover": {
      backgroundColor: (data as ColourOption).color,
      color: "white",
    },
  }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot((data as ColourOption).color),
  }),
};
