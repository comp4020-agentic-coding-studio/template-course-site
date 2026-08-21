#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { gitOrigin, resolveDeployment } from "./pages-base.ts";

const { base } = resolveDeployment(process.env, gitOrigin);
const prefix = `${base === "/" ? "" : base}/decks`;

execFileSync("astromotion-check", [`--prefix=${prefix}`], { stdio: "inherit" });
