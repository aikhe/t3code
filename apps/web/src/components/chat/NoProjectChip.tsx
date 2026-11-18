import { useGT } from "gt-react";
import { MessageSquareDashedIcon } from "lucide-react";

import { ComposerContextLabel } from "../ComposerContextLabel";

/** The tray row's lead in the empty-state composer, shown before any project exists. */
export function NoProjectChip() {
  const gt = useGT();
  return (
    <span
      className="inline-flex h-7 min-w-0 shrink-0 items-center gap-1.5 border border-transparent px-2 text-control text-muted-foreground sm:h-6"
      data-composer-context-control
    >
      <MessageSquareDashedIcon aria-hidden className="size-3.25 shrink-0" />
      <ComposerContextLabel>{gt("No project")}</ComposerContextLabel>
    </span>
  );
}
