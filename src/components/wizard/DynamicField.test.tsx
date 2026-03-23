import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicField } from "./DynamicField";
import type { FieldDef } from "@/lib/field-library";

function Wrapper({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, unknown>;
}) {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

const textField: FieldDef = {
  id: "test.name",
  groupId: "contact",
  type: "text",
  label: "Full Name",
  placeholder: "Enter your name",
  validation: { required: true },
  sortOrder: 1,
};

const optionalField: FieldDef = {
  id: "test.optional",
  groupId: "contact",
  type: "text",
  label: "Nickname",
  validation: {},
  sortOrder: 2,
};

const conditionalField: FieldDef = {
  id: "test.website",
  groupId: "contact",
  type: "text",
  label: "Website URL",
  validation: {},
  sortOrder: 3,
  conditionalOn: {
    fieldId: "test.hasSite",
    values: ["yes"],
  },
};

const checkboxConditionalField: FieldDef = {
  id: "test.extraInfo",
  groupId: "contact",
  type: "text",
  label: "Extra Info",
  validation: {},
  sortOrder: 4,
  conditionalOn: {
    fieldId: "test.features",
    values: ["blog"],
  },
};

describe("DynamicField", () => {
  it("renders a text input with the correct label", () => {
    render(
      <Wrapper>
        <DynamicField field={textField} />
      </Wrapper>,
    );
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("shows required indicator (*) when validation.required is true", () => {
    render(
      <Wrapper>
        <DynamicField field={textField} />
      </Wrapper>,
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("does not show required indicator when validation.required is not set", () => {
    render(
      <Wrapper>
        <DynamicField field={optionalField} />
      </Wrapper>,
    );
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("hides field when conditionalOn does not match", () => {
    render(
      <Wrapper defaultValues={{ "test.hasSite": "no" }}>
        <DynamicField field={conditionalField} />
      </Wrapper>,
    );
    expect(screen.queryByText("Website URL")).not.toBeInTheDocument();
  });

  it("shows field when conditionalOn matches", () => {
    render(
      <Wrapper defaultValues={{ "test.hasSite": "yes" }}>
        <DynamicField field={conditionalField} />
      </Wrapper>,
    );
    expect(screen.getByText("Website URL")).toBeInTheDocument();
  });

  it("for checkbox-group conditionalOn: shows field when watched array contains the target value", () => {
    render(
      <Wrapper defaultValues={{ "test.features": ["blog", "gallery"] }}>
        <DynamicField field={checkboxConditionalField} />
      </Wrapper>,
    );
    expect(screen.getByText("Extra Info")).toBeInTheDocument();
  });

  it("for checkbox-group conditionalOn: hides field when watched array does not contain target value", () => {
    render(
      <Wrapper defaultValues={{ "test.features": ["gallery", "store"] }}>
        <DynamicField field={checkboxConditionalField} />
      </Wrapper>,
    );
    expect(screen.queryByText("Extra Info")).not.toBeInTheDocument();
  });
});
