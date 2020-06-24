#!/bin/bash
COSMOS_LOCATION="$1";
echo COSMOS_LOCATION is $COSMOS_LOCATION;
export COSMOS_LOCATION;
nginx -g daemon off;
