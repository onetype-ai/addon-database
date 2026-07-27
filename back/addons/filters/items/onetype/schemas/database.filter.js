// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.schemas.ItemAdd({
    id: 'database.filter',
    description: 'The database filter shape.',
    addon: 'database',
    config: {
        field: {
            type: 'string',
            required: true,
            description: 'Column the filter applies to.'
        },
        value: {
            type: 'string|number|boolean|array',
            description: 'Value to compare against. Arrays for IN, BETWEEN, CONTAINS and OVERLAP.'
        },
        operator: {
            type: 'string',
            value: 'EQUALS',
            options: [
                'EQUALS', 'NOT EQUALS', 'LESS', 'GREATER', 'LESS EQUALS', 'GREATER EQUALS', 'LIKE',
                'NOT LIKE', 'ILIKE', 'NOT ILIKE', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN', 'NULL',
                'NOT NULL', 'CONTAINS', 'OVERLAP', 'HAS'
            ],
            description: 'Comparison operator.'
        }
    }
});
