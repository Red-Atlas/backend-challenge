import { Command } from "commander";

const args = new Command();

args.option("--env <env>", "environment");

args.parse();

export default args.opts();
