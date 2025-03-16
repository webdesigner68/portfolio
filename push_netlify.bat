@echo off
echo ================================================
echo Deploiement des corrections sur Netlify
echo ================================================
echo.
echo Poussee du code vers GitHub...
git push -u origin main
echo.
echo Termine!
echo.
echo Le site sera automatiquement mis a jour sur Netlify dans quelques minutes.
echo.
pause 