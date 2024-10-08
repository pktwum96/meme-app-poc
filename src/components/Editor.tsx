import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
// @ts-ignore: Unreachable code error
import { SandpackFileExplorer } from "sandpack-file-explorer";
import { useTheme } from "../contexts/theme";

const Editor = () => {
  const { theme } = useTheme();
  return (
    <SandpackProvider template="react" theme={theme.palette.mode}>
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor
          showTabs={true}
          showLineNumbers={true}
          showInlineErrors={true}
          closableTabs={true}
        />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};
export default Editor;
