// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/eduar/Desktop/Github/Pessoal/de-olho-no-foco/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/eduar/Desktop/Github/Pessoal/de-olho-no-foco/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/eduar/Desktop/Github/Pessoal/de-olho-no-foco/frontend/node_modules/@svgr/rollup/dist/index.js";
import eslintPlugin from "file:///C:/Users/eduar/Desktop/Github/Pessoal/de-olho-no-foco/frontend/node_modules/@nabla/vite-plugin-eslint/src/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\eduar\\Desktop\\Github\\Pessoal\\de-olho-no-foco\\frontend";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), eslintPlugin(), svgr({ exportType: "named" })],
    server: {
      port: Number(env.FRONTEND_PORT)
    },
    resolve: {
      alias: {
        "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
        "@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
        "@contexts": path.resolve(__vite_injected_original_dirname, "./src/contexts"),
        "@components": path.resolve(__vite_injected_original_dirname, "./src/components"),
        "@constants": path.resolve(__vite_injected_original_dirname, "./src/constants"),
        "@customtypes": path.resolve(__vite_injected_original_dirname, "./src/types"),
        "@hooks": path.resolve(__vite_injected_original_dirname, "./src/hooks")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlZHVhclxcXFxEZXNrdG9wXFxcXEdpdGh1YlxcXFxQZXNzb2FsXFxcXGRlLW9saG8tbm8tZm9jb1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZWR1YXJcXFxcRGVza3RvcFxcXFxHaXRodWJcXFxcUGVzc29hbFxcXFxkZS1vbGhvLW5vLWZvY29cXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2VkdWFyL0Rlc2t0b3AvR2l0aHViL1Blc3NvYWwvZGUtb2xoby1uby1mb2NvL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgc3ZnciBmcm9tIFwiQHN2Z3Ivcm9sbHVwXCI7XHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcIkBuYWJsYS92aXRlLXBsdWdpbi1lc2xpbnRcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3JlYWN0KCksIGVzbGludFBsdWdpbigpLCBzdmdyKHsgZXhwb3J0VHlwZTogXCJuYW1lZFwiIH0pXSxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogTnVtYmVyKGVudi5GUk9OVEVORF9QT1JUKSxcclxuICAgIH0sXHJcblxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2Fzc2V0c1wiKSxcclxuICAgICAgICBcIkBwYWdlc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3BhZ2VzXCIpLFxyXG4gICAgICAgIFwiQGNvbnRleHRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29udGV4dHNcIiksXHJcbiAgICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXHJcbiAgICAgICAgXCJAY29uc3RhbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvY29uc3RhbnRzXCIpLFxyXG4gICAgICAgIFwiQGN1c3RvbXR5cGVzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvdHlwZXNcIiksXHJcbiAgICAgICAgXCJAaG9va3NcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9ob29rc1wiKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFgsU0FBUyxjQUFjLGVBQWU7QUFDbGEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLEtBQUssRUFBRSxZQUFZLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFFaEUsUUFBUTtBQUFBLE1BQ04sTUFBTSxPQUFPLElBQUksYUFBYTtBQUFBLElBQ2hDO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDakQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLFFBQy9DLGFBQWEsS0FBSyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLFFBQ3JELGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ3pELGNBQWMsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLFFBQ3ZELGdCQUFnQixLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLFFBQ3JELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNqRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
