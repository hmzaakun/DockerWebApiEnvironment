#!/bin/bash

# Date actuelle au format YEAR-MONTH-DAY
backup_date=$(date +%Y-%m-%d)

# Dossier de sauvegarde
backup_folder="/backup_auto"

# Vérifier si le dossier de sauvegarde existe, sinon le créer
if [[ ! -d "$backup_folder" ]]; then
  mkdir -p "$backup_folder"
fi

# Chemin du répertoire contenant les fichiers sources de l'application React
app_source_folder="web/"

# Chemin du répertoire de sauvegarde avec la date
backup_path="$backup_folder/backup_$backup_date"

# Vérifier si le dossier de sauvegarde avec la date existe, sinon le créer
if [[ ! -d "$backup_path" ]]; then
  mkdir -p "$backup_path"
fi

# Effectuer la sauvegarde en utilisant rsync pour copier les fichiers sources dans le dossier de sauvegarde
rsync -av "$app_source_folder/" "$backup_path"

# Vérifier si la sauvegarde a été effectuée avec succès
if [[ $? -eq 0 ]]; then
  echo "Backup completed successfully : $backup_path"
else
  echo "Error while saving."
fi
