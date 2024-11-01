import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { company_sizes, onboard_steps, plans } from "../../config/constants";
import BasicSelect from "../../components/form/BasicSelect";
import { LoadingButton } from "@mui/lab";
import RadioButtonsGroup from "../../components/form/RadioGroup";
import MemberTile from "../../components/shared/MemberTile";
import ToggleTheme from "../../components/shared/ToggleTheme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { update_organization } from "../../api";
import { updateOrganization } from "../../store/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const OnBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { organization } = useAppSelector((state) => state.auth.user);
  const [activeStep, setActiveStep] = React.useState(0);
  const [saving, setSaving] = React.useState(false);
  const [completedSteps, setCompletedSteps] = React.useState(0);
  const [onboardForm, setOnboardForm] = useState({
    name: "",
    size: company_sizes[0].value,
    plan: plans[0].name,
  });

  useEffect(() => {
    if (organization) {
      setOnboardForm({
        name: organization.name,
        size: organization.size,
        plan: organization.plan,
      });
    }

    if (organization.name && organization.size) {
      setActiveStep(1);
      setCompletedSteps(1);
      if (organization.plan) {
        setActiveStep(2);
        setCompletedSteps(2);
      }
    }
  }, [organization]);

  function handleNext() {
    if (activeStep === onboard_steps.length - 1) {
      navigate("/dashboard");
      return;
    }
    switch (onboard_steps[activeStep].name) {
      case "org_details":
        handleUpdateOrg();
        break;
      case "select_plan":
        handleUpdateOrg();
        break;
    }
  }

  function handlePrevious() {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  async function handleUpdateOrg() {
    try {
      setSaving(true);
      const { data } = await update_organization({
        name: onboardForm.name,
        size: onboardForm.size,
        plan: onboardForm.plan,
      });
      dispatch(updateOrganization(data));
      setSaving(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      setSaving(false);
    }
  }
  return (
    <Box>
      <Stack
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          height: "100vh",
          width: "100vw",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <ToggleTheme />
        <Paper>
          <Stack width={500} p={3} spacing={3}>
            {/* TODO: could be a common component for title */}
            <Stack>
              <Typography color="textPrimary" variant="h5" fontWeight={600}>
                Organization Setup
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                Let's get your organization up and running
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              sx={{ height: 10 }}
              value={(completedSteps / onboard_steps.length) * 100}
            />

            <Stack spacing={2}>
              <Stack>
                <Typography variant="h6" fontWeight={600}>
                  {onboard_steps[activeStep].label}
                </Typography>
              </Stack>
              <Stack>
                {activeStep === 0 && (
                  <Stack spacing={2}>
                    <TextField
                      label="Company Name"
                      placeholder="Enter your company name"
                      value={onboardForm.name}
                      onChange={(e) =>
                        setOnboardForm((pf) => ({
                          ...pf,
                          name: e.target.value,
                        }))
                      }
                      size="small"
                    />
                    <BasicSelect
                      fullWidth
                      size="small"
                      handleChange={(v) =>
                        setOnboardForm((pf) => ({ ...pf, size: Number(v) }))
                      }
                      options={company_sizes.map((size) => ({
                        value: size.value,
                        label: size.name,
                      }))}
                      value={onboardForm.size}
                      label="Company Size"
                      placeholder="Select Company Size"
                    />
                  </Stack>
                )}
                {activeStep === 1 && (
                  <RadioButtonsGroup
                    options={plans.map((p) => ({
                      label: p.name,
                      value: p.name,
                    }))}
                    value={onboardForm.plan}
                    handleChange={(v) =>
                      setOnboardForm((pf) => ({ ...pf, plan: v.toString() }))
                    }
                    label="Select Plan"
                  />
                )}
                {activeStep === 2 && <MemberTile />}
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {activeStep !== 0 && (
                <Button onClick={handlePrevious} variant="outlined">
                  Previous
                </Button>
              )}
              <LoadingButton
                onClick={handleNext}
                variant="contained"
                loading={saving}
              >
                {activeStep === onboard_steps.length - 1 ? "Finish" : "Next"}
              </LoadingButton>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default OnBoard;
