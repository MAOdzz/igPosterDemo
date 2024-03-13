import './ControlPanel.scss';
import { useContext, useState, useRef } from 'react';
import { postStoreContext } from '../../../store/PostStoreContext';
import { observer } from 'mobx-react';
import { SelectionForm } from '../../UI/SelectionForm/SelectionForm';
import { Tone, Length, Style } from '../../../utils/ContentBlocks';
import {
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ControlPanel = observer(() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const initialFocusRef = useRef();

  const postStore = useContext(postStoreContext);
  const toneOptions = Object.entries(Tone).map(([value, label]) => ({
    value,
    label,
  }));
  const lengthOptions = Object.entries(Length).map(([value, label]) => ({
    value,
    label,
  }));
  const styleOptions = Object.entries(Style).map(([value, label]) => ({
    value,
    label,
  }));

  const handleToneChange = (value) => postStore.setTone(value);
  const handleLengthChange = (value) => postStore.setLength(value);
  const handleStyleChange = (value) => postStore.setStyle(value);
  const handlePromptChange = (event) => postStore.setPrompt(event.target.value);

  const isButtonDisabled =
    !postStore.tone || !postStore.length || !postStore.style;

  return (
    <div className="controls">
      <div className="controls--header">
        <h1>Let's create your new post</h1>
        <div>
          <Button
            colorScheme="teal"
            size="md"
            mr={4}
            onClick={() => postStore.gatherPostData()}
            className={isButtonDisabled ? 'disabled' : ''}
          >
            {isButtonDisabled ? 'Select Options To Generate' : 'Generate Post'}
          </Button>
          <Popover
            isOpen={isDatePickerOpen}
            initialFocusRef={initialFocusRef}
            onOpen={() => setIsDatePickerOpen(true)}
            onClose={() => setIsDatePickerOpen(false)}
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Button
                colorScheme="teal"
                size="md"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                className={isButtonDisabled ? 'disabled' : ''}
              >
                Schedule for later
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Choose a schedule date</PopoverHeader>
              <PopoverBody>
                <ReactDatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="controls--selectionContainer">
        <SelectionForm
          formHeader="Select Tone"
          selector={toneOptions}
          selectorDescription="Choose the tone of your post:"
          onSelectionChange={handleToneChange}
        />
        <SelectionForm
          formHeader="Select Length"
          selector={lengthOptions}
          selectorDescription="Choose the length of your post:"
          onSelectionChange={handleLengthChange}
        />
        <SelectionForm
          formHeader="Select Style"
          selector={styleOptions}
          selectorDescription="Choose the style of your post:"
          onSelectionChange={handleStyleChange}
        />
      </div>
      <div className="controls--footer">
        <h2>Additional prompt or topic (optional)</h2>
        <Textarea
          value={postStore.prompt}
          onChange={handlePromptChange}
          placeholder="Write a prompt for your post..."
          size="sm"
          resize="vertical"
          focusBorderColor="teal.400"
          variant="outline"
        />
      </div>
    </div>
  );
});
