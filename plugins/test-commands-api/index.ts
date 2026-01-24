import { DiscordSnowflake } from "@sapphire/snowflake";

export interface SlashCommand {
  id?: string;
  application_id?: string;
  name: string;
  description: string;
  options?: CommandOption[];
  dm_permission?: boolean;
  nsfw?: boolean;
  version?: string;
}

export interface CommandOption {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name: string;
  description: string;
  required: boolean;
  choices: { name: string; value: string | number }[];
  autocomplete: boolean;
  min_value: number;
  max_value: number;
  min_length: number;
  max_length: number;
  options: CommandOption[];
}

const {
  plugin: { scoped, store },
  flux: { storesFlat },
  util: { log },
} = shelter;

const applicationId = DiscordSnowflake.generate().toString();

const pluginApplication = {
  name: "Shelter",
  description: "Shelter commands",
  id: applicationId,
};

const commands: SlashCommand[] = [];

function registerCommand(command: SlashCommand) {
  command.id = DiscordSnowflake.generate().toString();
  command.application_id = applicationId;
  command.version = DiscordSnowflake.generate().toString();
  commands.push(command);
}

export function onLoad() {
  scoped.flux.intercept(payload => {});

  scoped.flux.intercept(payload => {
    if (payload.type !== "APPLICATION_COMMAND_INDEX_FETCH_SUCCESS") return;

    const index = payload.index;

    index.applications.push(pluginApplication);

    for (const command of commands) {
      index.application_commands.push(command);
    }
  });

  registerCommand({
    name: "aaaa",
    description: "",
  });
}
export function onUnload() {
  scoped.disposeAllNow();

  const currentChannel = storesFlat.ChannelStore.getChannel(
    storesFlat.SelectedChannelStore.getChannelId(),
  );

  shelter.flux.dispatcher.dispatch({
    type: "APPLICATION_COMMAND_INDEX_FETCH_REQUEST",
    target:
      currentChannel.guild_id === null
        ? { type: "channel", channelId: currentChannel.id }
        : { type: "guild", guildId: currentChannel.guild_id },
  });
}
