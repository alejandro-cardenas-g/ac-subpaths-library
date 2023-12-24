import fs from "fs";
import typescript from "@rollup/plugin-typescript";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import packageJson from "./package.json" assert { type: "json" };
import generatePackageJson from "rollup-plugin-generate-package-json";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import { dts } from "rollup-plugin-dts";
import autoprefixer from "autoprefixer";
import stringHash from "string-hash";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";
import classMapper from "./css.module.js";

export const listDirectory = (path) => {
  const directs = fs.readdirSync(path, { withFileTypes: true });
  return directs
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => {
      return dirent.name !== "@types";
    })
    .map((dirent) => dirent.name);
};

const postcssPlugin = postcss({
  plugins: [autoprefixer],
  autoModules: false,
  onlyModules: false,
  modules: {
    generateScopedName: (name, filename, css) => {
      if (filename.includes("global")) {
        return name;
      }
      const hash = stringHash(css).toString(36).substring(0, 5);
      const mappedHash = classMapper.getVerifyClass(name);
      if (mappedHash === null) {
        classMapper.insertClass(name, hash);
      }
      return `subpath_${name}_${mappedHash || hash}`;
    },
  },
  extract: "css/elsa-library.min.css",
  extensions: [".css"],
  minimize: true,
  sourceMap: false,
});

const postcssPluginSub = postcss({
  // plugins: [autoprefixer],
  // autoModules: false,
  // onlyModules: false,
  // extensions: [".css"],
  // minimize: true,
  // sourceMap: false,
  exclude: [`*.css`],
  plugins: [autoprefixer],
  autoModules: false,
  onlyModules: false,
  modules: {
    generateScopedName: (name, filename, css) => {
      if (filename.includes("global")) {
        return name;
      }
      const hash = stringHash(css).toString(36).substring(0, 5);
      const mappedHash = classMapper.getVerifyClass(name);
      if (mappedHash === null) {
        classMapper.insertClass(name, hash);
      }
      return `subpath_${name}_${mappedHash || hash}`;
    },
  },
  extensions: [".css"],
  minimize: true,
  sourceMap: false,
});

const plugins = [
  PeerDepsExternalPlugin(),
  nodeResolve(),
  replace({ preventAssignment: true }),
  commonjs({}),
  // postcss({
  //   autoModules: false,
  //   onlyModules: false,
  //   plugins: [autoprefixer],
  //   modules: {
  //     generateScopedName: (name, filename, css) => {
  //       if (filename.includes("global")) {
  //         return name;
  //       }
  //       const hash = stringHash(css).toString(36).substring(0, 5);
  //       const { base } = path.parse(
  //         filename
  //           .replace(/\.modules?\.css/g, "")
  //           .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  //       );
  //       return `mg_${base}_${name}_${hash}`.replace(/_{2,}/g, "_");
  //     },
  //   },
  //   extract: "css/subpaths-library.min.css",
  //   extensions: [".css"],
  //   minimize: true,
  //   sourceMap: false,
  // }),
  terser(),
];

const subfolderPlugins = (folderName, map) => [
  ...plugins,
  postcssPluginSub,
  typescript({
    tsconfig: "./tsconfig.json",
    declaration: false,
  }),
  generatePackageJson({
    baseContents: {
      name: `${packageJson.name}/${map}/${folderName}`,
      private: true,
      main: "../../cjs/index.js", // --> points to cjs format entry point of whole library
      module: "./index.js", // --> points to esm format entry point of individual component
      types: `../../types/${map}/${folderName}/index.d.ts`, // --> points to types definition file of individual component
    },
  }),
];

const folderList = ["atoms", "molecules"];

const folderBuilds = folderList.flatMap((map) =>
  listDirectory(`./src/${map}`).map((folder) => {
    return {
      input: [`src/${map}/${folder}/index.ts`],
      output: [
        {
          file: `dist/${map}/${folder}/index.js`,
          sourcemap: true,
          exports: "named",
          format: "esm",
        },
      ],
      plugins: subfolderPlugins(folder, map),
      external: ["react", "react-dom"],
    };
  })
);

export default [
  {
    input: ["src/index.ts"],
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      ...plugins,
      postcssPlugin,
      typescript({
        tsconfig: "./tsconfig.json",
      }),
    ],
    external: ["react", "react-dom"],
  },
  ...folderBuilds,
];
