### Puesta en marcha (PowerShell / VS Code)

- PowerShell 5.1 no entiende `&&`, asi que usa `;` para encadenar comandos o cambia el perfil de terminal a PowerShell 7/Git Bash si prefieres `&&`.
- Instala dependencias:
  - Frontend: `npm install`
  - Backend: `npm install --prefix backend`
- Levanta cada servicio en terminales separadas:
  - Frontend: `npm run dev`
  - Backend: `npm run backend`

Si prefieres seguir con PowerShell 5.1, estos comandos funcionan tal cual. Con PowerShell 7 o Git Bash tambien puedes usar `cd backend && npm run dev`.
