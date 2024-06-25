N
o
 
l
i
n
e
s
import DialogContent from '@material-ui/core/DialogContent';
import AppConfig from '../../config';
import LicenseContent from '../../LICENSE.txt';
const LicenseDialog = (props: Props) => {
  function renderContent() {
    return (
      <DialogContent
        // inputRef={ref => {
        //   licenseElement = ref;
        // }}
        style={{ overflow: AppConfig.isFirefox ? 'auto' : 'overlay' }}
      >
        <pre style={{ whiteSpace: 'pre-wrap' }} >
          {Pro ? Pro.EULAContent : LicenseContent}
        </pre>
      </DialogContent>
    );
  }
};
