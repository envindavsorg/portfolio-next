# Package Manager Snippet Examples

## Next.js Create Commands (Special handling - keeps npx, only changes --use-* flag)

```bash
npx create-next-app@latest my-app
```

Will generate:
- npm: `npx create-next-app@latest my-app --use-npm`
- yarn: `npx create-next-app@latest my-app --use-yarn`
- pnpm: `npx create-next-app@latest my-app --use-pnpm`
- bun: `npx create-next-app@latest my-app --use-bun`

## Install Commands

```bash
npm install
```

Will generate:
- npm: `npm install`
- yarn: `yarn install`
- pnpm: `pnpm install`
- bun: `bun install`

```bash
npm install react
```

Will generate:
- npm: `npm install react`
- yarn: `yarn add react`
- pnpm: `pnpm add react`
- bun: `bun add react`

## Run Commands

```bash
npm run dev
```

Will generate:
- npm: `npm run dev`
- yarn: `yarn dev`
- pnpm: `pnpm dev`
- bun: `bun run dev`

## Other Create Commands

```bash
npx create-react-app my-app
```

Will generate:
- npm: `npx create-react-app my-app`
- yarn: `yarn create react-app my-app`
- pnpm: `pnpm create react-app my-app`
- bun: `bunx create-react-app my-app`