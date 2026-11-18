import type { CSSProperties } from "react";
import { expect, it } from "vite-plus/test";

import { render } from "../../../test/render";
import { measureRestingComposerControls } from "./restingComposerControlsMeasurement";

const row: CSSProperties = { display: "flex", alignItems: "center", columnGap: 4 };
const icon: CSSProperties = { display: "inline-block", width: 16, height: 16, flexShrink: 0 };
const narrowHiddenLabel: CSSProperties = {
  position: "absolute",
  visibility: "hidden",
  width: "max-content",
};

function Controls({ iconOnly, combined = false }: { iconOnly: boolean; combined?: boolean }) {
  const compact = iconOnly ? "true" : "false";
  return (
    <div data-testid={`controls-${compact}-${combined}`} style={{ ...row, columnGap: 2 }}>
      <button type="button" data-chat-provider-model-picker style={row}>
        <span style={icon} />
        <span data-chat-provider-model-picker-label="true" style={narrowHiddenLabel}>
          Opus 5.5
        </span>
        {combined ? (
          <span data-composer-model-effort style={{ display: "inline-block", width: 48 }}>
            High
          </span>
        ) : null}
      </button>
      <div data-resting-fixed-control data-composer-block-icon-only={compact} style={row}>
        <span style={icon} />
        <span data-composer-control-label style={narrowHiddenLabel}>
          Medium
        </span>
      </div>
      <div data-resting-block="mode" data-composer-block-icon-only={compact} style={row}>
        <span style={icon} />
        <span data-composer-control-label style={narrowHiddenLabel}>
          Full access
        </span>
      </div>
    </div>
  );
}

it("measures labels a narrow composer hides the same whether or not the controls are icon-only", async () => {
  await using screen = await render(
    <>
      <Controls iconOnly={false} />
      <Controls iconOnly />
      <Controls iconOnly={false} combined />
      <Controls iconOnly combined />
    </>,
  );

  const measure = (testId: string) => {
    const controls = screen.getByTestId(testId).element();
    return controls instanceof HTMLElement ? measureRestingComposerControls(controls) : null;
  };
  const labelled = measure("controls-false-false");
  const iconOnly = measure("controls-true-false");
  expect(labelled).not.toBeNull();
  expect(labelled).toEqual(iconOnly);
  const combined = measure("controls-false-true");
  expect(combined).toEqual(measure("controls-true-true"));
  expect(combined!.iconOnlyFixedWidth! - labelled!.iconOnlyFixedWidth!).toBeCloseTo(52);
});
