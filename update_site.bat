@echo off
echo ================================================
echo Script de mise à jour du site
echo ================================================
echo.
echo Ajout des fichiers modifiés...
git add .
echo.
echo Création du commit...
set /p COMMIT_MSG="Message de commit (décrivez vos modifications): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Mise à jour du site
git commit -m "%COMMIT_MSG%"
echo.
echo Poussée des modifications sur GitHub...
echo Collez votre token GitHub lorsque demandé...
echo.
.\push_with_token.bat
echo.
echo Terminé!
echo.
echo Vos modifications seront automatiquement déployées sur Netlify dans quelques minutes.
echo.
pause 