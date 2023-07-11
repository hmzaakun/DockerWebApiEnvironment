#!/bin/bash

# Récupérer les paramètres du script
read -p "Enter the date in YEAR-MONTH-DAY format (ex: 2023-07-07) : " backup_date
read -p "Enter the backup folder path : " backup_folder

# Vérifier si les paramètres sont renseignés, sinon demander en interactif
if [[ -z "$backup_date" ]]; then
  read -p "Backup date (YEAR-MONTH-DAY) : " backup_date
fi

if [[ -z "$backup_folder" ]]; then
  read -p "Backup folder path : " backup_folder
fi

# Vérifier si le dossier de sauvegarde existe, sinon le créer
if [[ ! -d "$backup_folder" ]]; then
  mkdir -p "$backup_folder"
fi

# Chemin du répertoire contenant les fichiers sources de l'application React
app_source_folder="/web"

# Chemin du répertoire de sauvegarde avec la date
backup_path="$backup_folder/backup_$backup_date"

# Effectuer la sauvegarde en utilisant rsync pour synchroniser les fichiers sources
rsync -av "$app_source_folder" "$backup_path"

# Vérifier si la sauvegarde a été effectuée avec succès
if [[ $? -eq 0 ]]; then
  echo "Backup completed successfully : $backup_path"
else
  echo "Error while saving."
fi
