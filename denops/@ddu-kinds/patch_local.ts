import { BaseKind } from "https://deno.land/x/ddu_vim@v3.4.3/base/kind.ts";
import {
  ActionFlags,
  type Actions,
} from "https://deno.land/x/ddu_vim@v3.4.3/types.ts";

export type ActionData = {
  name: string;
};

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  override actions: Actions<Params> = {
    async start(args) {
      const { name } = args.items.at(-1)?.action as ActionData;
      await args.denops.call("ddu#start", { name: name });
      return Promise.resolve(ActionFlags.None);
    },
  };

  override params(): Params {
    return {};
  }
}
