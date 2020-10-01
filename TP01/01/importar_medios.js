const fs  = require('fs'),
			evt = require('events'),
			rl 	= require('readline');
			
// ---------------------------------------------------------------------------

const schema = {
				medios: {
					id: 0,
					nombre         	:  1,
					id_especialidad	:  'especialidades.id',
					id_tipo_medio  	:  'tipos_medio.id',
					direccion      	:  6,
					id_ciudad      	:  'ciudades.id'
				},
				especialidades: {
					id:	-1,
					descripcion			:	 5
				},
				tipos_medio: {
					id:	-1,
					descripcion			:	 4						
				},
				provincias: {
					id:	-1,
					descripcion			:	 2
				},
				ciudades: {
					id:	-1,
					id_provincia    : 'provincias.id',
					descripcion			:	 3				
				}
			},
			data = {};	

// ---------------------------------------------------------------------------

for (let table in schema) {
	data[table] = [];
}
		
// ---------------------------------------------------------------------------

function getPk(table, col, lData) {
	let row = build(table, lData),
			npk = row[col];
	
	if ( schema[table][col] == -1 ) {
		for ( let idx in data[table] ) {
			let curr = data[table][idx],
					match = true;
			
			for ( let prop in schema[table] ) {
				if (prop == col) {
					continue;
				}
				
				if (curr[prop] != row[prop]) {
					match = false;
					break;
				}			
			}
			
			if (match) {
				row = curr;
				break;
			}
		}
	}
	
	if (row[col] == npk) {
		data[table].push(row);
	}
	
	return row[col];
}

// ---------------------------------------------------------------------------

function build(table, lData) {
	const cols = schema[table];
	
	return Object.keys(cols).reduce((row, name) => {
		if ( isNaN(cols[name]) ) {
			let src = cols[name].split('.');
			row[name] = getPk(src[0], src[1], lData);
			return row;
		}
		
		if ( cols[name] == -1 ) {
			row[name] = data[table].length + 1;
			return row;
		}
		
		row[name] = lData[cols[name]];
		return row;	
	}, {});
}

// ---------------------------------------------------------------------------

(async () => {
	
  try {
		let input = fs.createReadStream('./medios.csv'),
				iface = rl.createInterface({ input, crlfDelay: Infinity });
						
		let skip = 1,
				sep  = ';',
				buf  = '';
				
		iface.on('line', (line) => {
			if (skip > 0) {
				skip--;
				return;
			}
				
			line = buf + line;			
			if (line.indexOf('"') > -1 && line.match(/(["]{1,1})/g).length % 2 == 1) {
				buf = line;
				return;
			}
			
			buf = '';			
			let lData = line.split(sep);	
			lData = lData.map((col) => (col.trim().replace(/""/g, '"').replace(/^"(.*)"$/g, '$1')));
			data.medios.push(build('medios', lData));
		});
		
    await evt.once(iface, 'close');		
	
		console.log(data);

		let inserts = [];
		for (let table in data) {
			inserts = inserts.concat(data[table].map((row) => {
				return "INSERT INTO " + table + ' (' + Object.keys(schema[table]).join(', ') + ') VALUES (' +
					Object.values(row).map((col) => ('"' + col.toString().replace(/"/g, "\\\"") + '"')).join(', ')
				+ ');'
			}));
		}
		
		fs.writeFileSync('medios.sql', inserts.join('\n'));
		console.log('medios.sql generado.');
  } catch (err) {
    console.error(err);
  }
})();