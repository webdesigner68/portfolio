@echo off
echo ================================================
echo Script de push GitHub avec token d'accès personnel
echo ================================================
echo.
echo 1) Allez sur https://github.com/settings/tokens
echo 2) Cliquez sur "Generate new token (classic)"
echo 3) Donnez un nom au token, cochez "repo" et cliquez sur "Generate token"
echo 4) Copiez le token généré
echo.
set /p TOKEN="Collez votre token d'accès personnel GitHub ici: "
echo.
echo Configuration du dépôt distant avec le token...
git remote set-url origin https://%TOKEN%@github.com/webdesigner68/portfolio.git
echo.
echo Vérification du statut...
git status
echo.
echo Ajout de tous les fichiers modifiés...
git add .
echo.
echo Création d'un commit...
set /p COMMIT_MSG="Message de commit (ou appuyez sur Entrée pour 'Mise à jour du portfolio'): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Mise à jour du portfolio
git commit -m "%COMMIT_MSG%"
echo.
echo Poussée du code vers GitHub...
git push -u origin main
echo.
echo Restauration de l'URL d'origine...
git remote set-url origin https://github.com/webdesigner68/portfolio.git
echo.
echo Terminé!
pause 