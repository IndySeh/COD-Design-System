#!/bin/bash

DEFAULT_PROJECT_ROOT=./
PROJECT_ROOT=${1:-$DEFAULT_PROJECT_ROOT}

if [[ ! -d $PROJECT_ROOT ]];
then
    echo ${PROJECT_ROOT}" is not a directory..."
    exit 1
fi

compile_sass () {
    echo "Compiling bootstrap SASS..."
    yarn sass -I ${PROJECT_ROOT}/node_modules/ ${PROJECT_ROOT}src/scss/themed-bootstrap.scss ${PROJECT_ROOT}src/shared/themed-bootstrap.css
    if [ $? -ne 0 ];
    then
        echo "Failed to compile bootstrap... Aborting."
        exit 1
    fi
}

replace_rem_w_em () {
    echo "Replacing REMs with EMs..."
    sed -i -r "s|([0-9])rem|\1em|g" ${PROJECT_ROOT}src/shared/themed-bootstrap.css
    if [ $? -ne 0 ];
    then
        echo "Failed to replace content... Aborting."
        exit 1
    fi
}

format_bootstrap () {
    echo "Formatting output..."
    yarn prettier -w ${PROJECT_ROOT}src/shared/themed-bootstrap.css
    if [ $? -ne 0 ];
    then
        echo "Formatting output failed... Aborting."
        exit 1
    fi
}

compile_sass
replace_rem_w_em
format_bootstrap
exit $?
