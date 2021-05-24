import { Table, TableCell, TableContainer, 
    TableHead, TableRow, Typography,
    TextField } 
    from "@material-ui/core";

const DistributionList = (props) => {
    return(
    <TableContainer className='table-container'>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <TextField label='Receiver'/>
                    </TableCell>

                    <TableCell>
                        <TextField label='Name'/>
                    </TableCell>
                    
                    <TableCell>
                        <TextField label='Distributor'/>
                    </TableCell>
                    
                    <TableCell>
                        <TextField label='Amount'/>        
                    </TableCell>
                    
                    <TableCell>
                        <TextField label='Reason'/>
                    </TableCell>
                    
                    <TableCell>
                        <TextField label='Date'/>
                    </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>)
}

export default DistributionList;