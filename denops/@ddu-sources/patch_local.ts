import { DduOptions, Item } from "https://deno.land/x/ddu_vim@v3.4.4/types.ts";
import type { ActionData } from "../@ddu-kinds/patch_local.ts";
import {
  BaseSource,
  type OnInitArguments,
} from "https://deno.land/x/ddu_vim@v3.4.3/base/source.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params, ActionData> {
  override kind = "patch_local";
  #items: Item<ActionData>[] = [];

  override async onInit(args: OnInitArguments<Params>): Promise<void> {
    const patchLocals = await args.denops.call(
      "ddu#custom#get_local",
    ) as Partial<DduOptions>;
    this.#items = Object.keys(patchLocals).map((word) => ({
      word,
      action: { name: word },
    }));
  }

  override gather(_args: unknown): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start: (controller) => {
        controller.enqueue(this.#items);
        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}
