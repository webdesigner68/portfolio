@echo off
echo Configuration du dépôt distant...
git remote set-url origin https://github.com/webdesigner68/portfolio.git
echo Vérification du statut...
git status
echo Poussée du code vers GitHub...
git push -u origin main
echo Terminé!
pause 