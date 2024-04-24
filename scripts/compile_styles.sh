#!/bin/bash

DEFAULT_PROJECT_ROOT=./
PROJECT_ROOT=${1:-$DEFAULT_PROJECT_ROOT}

if [[ ! -d $PROJECT_ROOT ]]; then
    echo "${PROJECT_ROOT} is not a directory..."
    exit 1
fi

compile_bootstrap () {
    echo "Compiling bootstrap SASS..."
    yarn sass -I ${PROJECT_ROOT}/node_modules/ "${PROJECT_ROOT}src/scss/themed-bootstrap.scss" "${PROJECT_ROOT}src/shared/themed-bootstrap.css"
    if [ $? -ne 0 ];
    then
        echo "Failed to compile bootstrap... Aborting."
        exit 1
    fi

    # Apply replace_rem_w_em and format_bootstrap functions to the generated bootstrap CSS file
    replace_rem_w_em "${PROJECT_ROOT}src/shared/themed-bootstrap.css"
    format_bootstrap "${PROJECT_ROOT}src/shared/themed-bootstrap.css"
}

compile_components() {
    # Variable Setup
    folders=("atoms" "molecules" "organisms")
    base_path="${PROJECT_ROOT}src/components"
    directories_not_found=()

    # Check if directories exist
    for folder in "${folders[@]}"; do
        current_path="${base_path}/${folder}"
        
        if [[ ! -d $current_path ]]; then
            echo "Directory '${current_path}' not found."
            directories_not_found+=("$folder")
        fi
    done

    if [[ ${#directories_not_found[@]} -gt 0 ]]; then
        echo "Aborting CSS generation. Directories not found: ${directories_not_found[*]}"
        exit 1
    fi

    # Find and print .scss files before confirmation
    found_scss_files=()
    for folder in "${folders[@]}"; do
        current_path="${base_path}/${folder}"

        while read -r scss_file; do
            found_scss_files+=("$scss_file")
        done < <(find "$current_path" -type f -name '*.scss')
    done

    # Display found .scss files
    echo "Found .scss files:"
    for scss_file in "${found_scss_files[@]}"; do
        echo "$scss_file"
    done

    # Confirm with the user
    read -p "Confirm the conversion of found .scss files (input 'yes' to proceed or 'abort' to stop the script): " user_input

    case $user_input in
        "yes")
            # Continue with the conversion
            echo "Starting CSS generation..."
            ;;
        "abort")
            echo "Aborting the script."
            exit 0
            ;;
        *)
            echo "Invalid input. Aborting."
            exit 1
            ;;
    esac
    
    # Convert .scss files to .css
    for scss_file in "${found_scss_files[@]}"; do

        # Get the real path of the file
        component_scss_path=$(realpath "$scss_file")

        # Replace the file extension to get the CSS output file name.
        output_css_file="${component_scss_path%.*}.css"

        # Run yarn sass command for each .scss file
        yarn sass -I ${PROJECT_ROOT}/node_modules/ "$component_scss_path" "$output_css_file"

        # Apply replace_rem_w_em and format_bootstrap functions to the generated CSS file
        replace_rem_w_em "$output_css_file"
        format_bootstrap "$output_css_file"
    done

    echo "CSS generation and post-processing completed."
}

replace_rem_w_em () {
    echo "Replacing REMs with EMs..."
    sed -i -r "s|([0-9])rem|\1em|g" "$1" 
    if [ $? -ne 0 ]; then
        echo "Failed to replace REMs with EMs in $1... Aborting."
        exit 1
    fi
}

format_bootstrap () {
    echo "Formatting output..."
    yarn prettier -w "$1"
    if [ $? -ne 0 ]; then
        echo "Formatting output failed for $1... Aborting."
        exit 1
    fi
}

# Call the functions
compile_components
compile_bootstrap
exit $?