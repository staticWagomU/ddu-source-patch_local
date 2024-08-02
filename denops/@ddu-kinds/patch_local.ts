import {
  ActionFlags,
  type Actions,
  BaseKind
} from "jsr:@shougo/ddu-vim@^5.0.0/types";

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
