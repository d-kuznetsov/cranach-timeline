import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./ExpansionPanel.module.scss";

function stopPropagation(e) {
  e.stopPropagation();
}

export default function Panel({ summary, children }) {
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div
            className={styles.summaryContent}
            onClick={stopPropagation}
            onFocus={stopPropagation}
          >
            {summary}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

Panel.propTypes = {
  summary: PropTypes.element,
  children: PropTypes.element,
};
