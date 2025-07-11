# Package Manager & Terminal Command Snippet Examples

## Package Manager Commands

### Next.js Create Commands (Special handling - keeps npx, only changes --use-* flag)

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

## Terminal Commands

### Basic File Operations

```bash
ls -la
```

**Generates cross-shell variants:**
- bash: `ls -la`
- zsh: `ls -la`
- fish: `ls -la`
- powershell: `Get-ChildItem -la`

### File Content

```bash
cat package.json
```

**Generates:**
- bash: `cat package.json`
- zsh: `cat package.json`
- fish: `cat package.json`
- powershell: `Get-Content package.json`

### Search Operations

```bash
grep "error" logs.txt
```

**Generates:**
- bash: `grep "error" logs.txt`
- zsh: `grep "error" logs.txt`
- fish: `grep "error" logs.txt`
- powershell: `Select-String "error" logs.txt`

### Directory Operations

```bash
mkdir new-folder
```

**Generates:**
- bash: `mkdir new-folder`
- zsh: `mkdir new-folder`
- fish: `mkdir new-folder`
- powershell: `New-Item -ItemType Directory -Name new-folder`

### Complex Commands with Logic

```bash
cd project && npm install
```

**Generates:**
- bash: `cd project && npm install`
- zsh: `cd project && npm install`
- fish: `cd project; and npm install`
- powershell: `cd project && npm install`