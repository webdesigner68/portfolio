@echo off
echo ================================================
echo Script de push GitHub pour Netlify
echo ================================================
echo.
echo Poussée du code vers GitHub...
git push -u origin main
echo.
echo Terminé!
echo.
echo Maintenant, allez sur Netlify (https://app.netlify.com) pour déployer votre site.
echo.
pause 