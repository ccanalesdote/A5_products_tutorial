<<?php

    //neitcom controller

    function cancelarProceso() {        
        $this->General_model->cleanAllRuts();        
        $model = $this->General_model->findBypk('par_definicion', 'neitcom_carga', 'pdef_descripcion');
        $id_bitacora = $model->pdef_valor1;
        $bitacora = array();
        $bitacora['neit_tipo'] = 'cancelado';
        $this->General_model->updateEstadoBitacoraNeitcom($bitacora, $id_bitacora);
        $this->General_model->update('par_definicion', 'pdef_descripcion', 'neitcom_carga', ['pdef_valor1' => NULL, 'pdef_valor2' => NULL, 'pdef_valor3' => 'completo']);

        echo json_encode(
                array(
                    'estado' => 'success'
                )
        );
    }

    //General_model

    function cleanAllRuts(){
        $consulta = "TRUNCATE TABLE neitcom_ruts_manual";

        $this->db->query($consulta);
    }
    
    function updateEstadoBitacoraNeitcom($data, $id) {
        $consulta = "UPDATE neitcom_bitacora SET 
            neit_tipo = '". $data['neit_tipo'] ."' 
            WHERE neit_id = '" . $id . "'";
        
        $this->db->query($consulta);
    }